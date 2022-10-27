import { Dayjs } from "dayjs";
import { atom } from "recoil";

export const partyDetailsState = atom({
  key: "partyDetails",
  default: JSON.parse(localStorage.getItem("details")!) || {
    title: "" as string,
    des: "" as string,
    date: null as Dayjs | null,
    collaborators: [] as string[],
    services: {
      entertainmentService: "" as string,
      foodService: "" as string,
      musicService: "" as string,
      generalService: "" as string,
      locationService: "" as string,
    },
    photos: [] as string[],
  },
});

export const partySubmitState = atom({
  key: "partySubmit",
  default: { submit: false, partyToken: "" },
});

export const addServicesInputsState = atom({
  key: "addService",
  default: [] as string[],
});
