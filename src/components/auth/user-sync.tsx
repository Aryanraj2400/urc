import { currentUser } from "@clerk/nextjs/server";
import { syncUser } from "@/lib/actions/users";

export default async function UserSync() {
    const user = await currentUser();

    if (user) {
        const email = user.emailAddresses[0]?.emailAddress;

        if (email) {
            await syncUser({
                clerkId: user.id,
                email: email,
                fullName: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
                // Phone and address might not be available directly from Clerk basic profile
                // but can be updated later by the user in a profile page.
            });
        }
    }

    return null;
}
