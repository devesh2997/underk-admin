export default interface Employee {
  euid: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileCountryCode: string;
  mobileNumber: number;
  dob: Date;
  gender: string;
  picUrl: string;
  mobileVerified: boolean;
  emailVerified: boolean;
  address: string;
}
