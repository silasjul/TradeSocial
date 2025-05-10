import { Person, Post } from "@/lib/interfaces";
import Image from "next/image";

export default function PostCard({
    post,
    person,
    onHover,
}: {
    post: Post;
    person: Person;
    onHover?: (arg: Post | undefined) => void;
}) {
    const date = new Date(post.time);
    const dateStr = date.toString().slice(4, 21); // month day year hour:minute

    return (
        <div
            className="bg-background border rounded-lg p-4"
            onMouseEnter={() => onHover && onHover(post)}
            onMouseLeave={() => onHover && onHover(undefined)}
        >
            <div className="flex gap-2">
                <div>
                    <Image
                        className="min-w-[35px] min-h-[35px] rounded-full"
                        width={35}
                        height={35}
                        src={person.img}
                        alt={"profile_image"}
                    />
                </div>
                <div>
                    <div className="flex gap-1 items-center">
                        <p className="font-bold">{person.name}</p>
                        <div className="flex gap-1 justify-center text-sm opacity-80">
                            <p>{person.username}</p>
                            <p>{dateStr}</p>
                        </div>
                    </div>
                    <p>{post.text}</p>
                </div>
            </div>
        </div>
    );
}
