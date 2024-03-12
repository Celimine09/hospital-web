import { getPatientsNames } from "../service/patients.service"
import { getStaffsName } from "../service/stafff.service"

export const setPatientsAndStaffDropdownData = (
    setPatientsName: (pns: string[]) => void,
    setStaffsName: (stns: string[])=> void,
    patientNames: string[],
    staffNames: string[],
    ) => {
    getPatientsNames().then((ps) => {
        if (ps !== null) {
            setPatientsName(ps)
            patientNames.push("") // empty people
            console.log("set up patients name to room-page data".america)
        }
    }).catch((e) => {
        console.error(e)
    })

    getStaffsName().then((s) => {
        if (s !== null) {
            setStaffsName(s)
            staffNames.push("") // empty people
            console.log("set up staff name to room-page data".america)
        }
    }).catch((e) => {
        console.error(e)
    })
}