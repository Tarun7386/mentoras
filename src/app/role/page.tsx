import { auth } from "~/server/auth";
import MultiStepForm from "../_components/multiform";
import { redirect } from 'next/navigation'

async function Role() {
    const session = await auth();

    if(!session?.user) {
        redirect("/api/auth/signin")
    }

    return ( 
        <MultiStepForm/>
     );
}

export default Role;