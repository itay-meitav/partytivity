import { Dayjs } from "dayjs";
import { atom } from "recoil";
import { newPartyDetails } from "./types";

export const newPartyDetailsState = atom({
  key: "newPartyDetails",
  default:
    JSON.parse(localStorage.getItem("details")!) ||
    ({
      title: "",
      description: "",
      date: null as Dayjs | null,
      collaborators: [],
      services: {
        entertainmentService: "",
        foodService: "",
        musicService: "",
        generalService: "",
        locationService: "",
      },
      photos: [],
    } as newPartyDetails),
});

export const addServicesInputsState = atom({
  key: "addService",
  default: [] as string[],
});
