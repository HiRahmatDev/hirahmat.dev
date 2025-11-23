export function ArticlesSkeleton() {
    return (
        <div className="space-y-8 animate-pulse">
            {/* Filter Buttons Skeleton */}
            <div className="flex flex-wrap gap-2">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="h-9 w-20 rounded-full bg-zinc-200"
                    />
                ))}
            </div>

            {/* Articles Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="w-full space-y-4">
                        {/* Image Skeleton */}
                        <div className="relative w-full aspect-video rounded-2xl bg-zinc-200" />

                        <div className="space-y-2">
                            {/* Category Badge Skeleton */}
                            <div className="h-6 w-24 rounded-full bg-zinc-200" />

                            {/* Title Skeleton */}
                            <div className="space-y-1">
                                <div className="h-7 w-full rounded bg-zinc-200" />
                                <div className="h-7 w-3/4 rounded bg-zinc-200" />
                            </div>

                            {/* Description Skeleton */}
                            <div className="space-y-1 pt-1">
                                <div className="h-5 w-full rounded bg-zinc-200" />
                                <div className="h-5 w-full rounded bg-zinc-200" />
                                <div className="h-5 w-2/3 rounded bg-zinc-200" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
