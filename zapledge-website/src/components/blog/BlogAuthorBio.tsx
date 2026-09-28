interface AuthorProps {
  name: string;
  role: string;
  bio: string;
}

export default function BlogAuthorBio({ author }: { author: AuthorProps }) {
  const authorInitials = author.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  return (
    <div className="my-10 p-6 sm:p-7 rounded-2xl bg-white border border-[#E5E5E5] flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-sm">
      <div
        className="h-14 w-14 rounded-full bg-[#00003C] text-white flex items-center justify-center font-bold text-lg shrink-0 ring-4 ring-[#0033FF]/15"
        aria-hidden="true"
      >
        {authorInitials}
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#0033FF] uppercase tracking-wider">
            Written by
          </span>
        </div>
        <h3 className="text-lg font-bold text-[#00003C] mt-0.5">
          {author.name}
        </h3>
        <p className="text-xs sm:text-sm font-medium text-[#0033FF] mt-0.5">
          {author.role}
        </p>
        <p className="text-sm text-[#555555] mt-2 leading-relaxed">
          {author.bio}
        </p>
      </div>
    </div>
  );
}
