import {UserInformation} from "../user/UserInformation";
import Plan from "../plan/Plan";

export interface ProfileInformation extends UserInformation{
    email: string;
    plans: Plan[];
}