import Plan from '../plan/Plan';
import { UserInformation } from '../user/UserInformation';

export interface ProfileInformation extends UserInformation {
    email: string;
    plans: Plan[];
}
