import { randomInt } from "crypto";

const channelService = {
  getChannels: async (amt: number) => {
    console.log("Fetching channels");

    let users = (await (await fetch("https://dummyjson.com/users")).json())
      .users as User[];

    users.sort((a, b) => {
      if (randomInt(10) < 5) {
        return 1;
      } else {
        return -1;
      }
    });

    let channels: Channel[] = [];

    for (let i = 0; i < amt; i++) {
      let user = users[i];

      let channel: Channel = {
        id: user.id,
        name: user.firstName,
        subscribers: user.age + user.height,
      };

      channels.push(channel);
    }

    return channels;
  },
};

export type Channel = {
  id: number;
  name: string;
  subscribers: number;
};

export type User = {
  id: number;
  firstName: string;
  age: number;
  height: number;
};

export default channelService;
