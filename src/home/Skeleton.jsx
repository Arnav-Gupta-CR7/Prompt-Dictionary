export default function Skeleton() {
    return (
    


    <div className="mt-12 grid grid-cols-[repeat(auto-fill,240px)] gap-4 justify-center">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i}>
          


      <div
        className="
          card bg-base-200
          border border-base-300
          w-60 h-64
        "
      >
        <div className="card-body p-4 flex flex-col justify-between">

            {/* Top */}
            <div className="space-y-2">

              {/* Badge + score */}
              <div className="flex items-center justify-between">
                <div className="skeleton h-5 w-20 rounded-full"></div>
                <div className="skeleton h-3 w-6"></div>
              </div>

              {/* Title */}
              <div className="space-y-1">
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-5/6"></div>
              </div>

              {/* Description */}
              <div className="space-y-1 pt-1">
                <div className="skeleton h-3 w-full"></div>
                <div className="skeleton h-3 w-full"></div>
                <div className="skeleton h-3 w-4/6"></div>
              </div>
            </div>

            {/* Bottom */}
            <div className="flex justify-end pt-2">
              <div className="skeleton h-7 w-12 rounded-md"></div>
            </div>

          </div>
        </div>



          




        </div>
      ))}
    </div>

      


  )
}