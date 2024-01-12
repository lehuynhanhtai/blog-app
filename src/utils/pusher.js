import PusherServer from "pusher";
import PusherClient from "pusher-js";

export const pusherServer = new PusherServer({
  appId: "1735661",
  key: "c604d4c18d592d7db774",
  secret: "aba92ecb2bbf657e62d8",
  cluster: "ap1",
  useTLS: true,
});

export const pusherClient = new PusherClient("c604d4c18d592d7db774", {
  cluster: "ap1",
  forceTLS: true,
});
