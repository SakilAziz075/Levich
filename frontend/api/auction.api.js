import { httpGet } from "./http";

export function getItems() {
  return httpGet("/api/items");
}

export function getServerTime() {
  return httpGet("/api/time");
}
