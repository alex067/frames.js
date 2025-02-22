import { MessageType, UserDataType, Message } from "@farcaster/core";
import { HubHttpUrlOptions, UserDataReturnType } from "./types";

/**
 * Returns the latest user data for a given Farcaster users Fid if available.
 */
export async function getUserDataForFid<
  Options extends HubHttpUrlOptions | undefined,
>({
  fid,
  options = {},
}: {
  /** the user's Farcaster fid` */
  fid: number;
  options?: Options;
}): Promise<UserDataReturnType> {
  const optionsOrDefaults = {
    hubHttpUrl: options.hubHttpUrl ?? "https://nemes.farcaster.xyz:2281",
  };

  const userDataResponse = await fetch(
    `${optionsOrDefaults.hubHttpUrl}/v1/userDataByFid?fid=${fid}`
  );

  const { messages } = await userDataResponse.json();

  if (messages && messages.length > 0) {
    const valuesByType = messages.reduce((acc: any, messageJson: any) => {
      const message = Message.fromJSON(messageJson);

      if (message.data?.type !== MessageType.USER_DATA_ADD) {
        return;
      }

      const timestamp = message.data.timestamp;
      const { type, value } = message.data.userDataBody!;

      if (!acc[type]) {
        acc[type] = { value, timestamp };
      } else if (message.data.timestamp > acc[type].timestamp) {
        acc[type] = { value, timestamp };
      }
      return acc;
    }, {});

    return {
      profileImage: valuesByType[UserDataType.PFP]?.value,
      displayName: valuesByType[UserDataType.DISPLAY]?.value,
      username: valuesByType[UserDataType.USERNAME]?.value,
      bio: valuesByType[UserDataType.BIO]?.value,
    };
  } else {
    return null;
  }
}
