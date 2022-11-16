import { Dayjs } from "dayjs";
import { atom } from "recoil";

export const newPartyDetailsState = atom({
  key: "newPartyDetails",
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

export const newPartySubmitState = atom({
  key: "partySubmit",
  default: { errorMessage: "", partyToken: "" },
});

export const addServicesInputsState = atom({
  key: "addService",
  default: [] as string[],
});
