export type newPartyDetails = {
  title: string;
  description: string;
  date: Date | null;
  collaborators: string[];
  services: {
    entertainmentService: string;
    foodService: string;
    musicService: string;
    generalService: string;
    locationService: string;
  };
  photos: string[];
};
