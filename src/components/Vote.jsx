import { db } from "@/db";
import auth from "../app/middleware";
import { revalidatePath } from "next/cache";
import { VoteButton } from "./VoteButton";

export async function Vote({ postId, votes }) {
  async function upvote() {
    "use server";
    const session = await auth();
    console.log("Upvote", postId, "by user", session.user.id);
    //FK add
    //check if user already has made an upvote or a downvote for this post
    const { rows } = await db.query(
      "SELECT * from votes WHERE user_id = $1 and post_id = $2 AND vote_type = $3",
      [session.user.id, postId, "post"]
    );
    //if length of rows is more than 0, user must have already voted - return stops moving onto the insert statement
    if (rows.length > 0) {
      console.log("User has already voted");
      return;
    }
    //or if user hasn't already voted this will run
    await db.query(
      "INSERT INTO votes (user_id, post_id, vote, vote_type) VALUES ($1, $2, $3, $4)",
      [session.user.id, postId, 1, "post"]
    );

    revalidatePath("/");
    revalidatePath(`/post/${postId}`);
  }

  async function downvote() {
    "use server";
    const session = await auth();
    console.log("Downvote", postId, "by user", session.user.id);
    const { rows } = await db.query(
      "SELECT * from votes WHERE user_id = $1 and post_id = $2 AND vote_type = $3",
      [session.user.id, postId, "post"]
    );
    //if length of rows is more than 0, user must have already voted - return stops moving onto the insert statement
    if (rows.length > 0) {
      console.log("User has already voted");
      return;
    }
    //or they can vote away!
    await db.query(
      "INSERT INTO votes (user_id, post_id, vote, vote_type) VALUES ($1, $2, $3, $4)",
      [session.user.id, postId, -1, "post"]
    );

    revalidatePath("/");
    revalidatePath(`/post/${postId}`);
  }

  return (
    <>
      {votes} votes
      <div className="flex space-x-3">
        <form action={upvote}>
          <VoteButton label="Upvote" />
        </form>
        <form action={downvote}>
          <VoteButton label="Downvote" />
        </form>
      </div>
    </>
  );
}
