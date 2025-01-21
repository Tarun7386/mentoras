import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import ClientRolePage from "../_components/clientRolePage";

async function Role() {
    const session = await auth();

    // Redirect to sign-in if the user is not logged in
    if (!session?.user) {
        redirect("/api/auth/signin");
    }

    // Render the client component with session data
    return <ClientRolePage userId={session.user.id} />;
}

export default Role;
