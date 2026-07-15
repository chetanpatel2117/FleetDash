export interface Vehicle {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  speed: number;
  heading: number;
  status: "moving" | "idle" | "offline";
  lastUpdated: string;
}