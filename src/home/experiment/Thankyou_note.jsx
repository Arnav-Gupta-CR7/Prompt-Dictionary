import Card from "./Thankyou_printer";

export default function Thankyou_note() {
  return (
    <>
      {/* Open modal */}
      <label htmlFor="my_modal_7" className="btn btn-xs md:btn-sm">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
      </label>

      <input type="checkbox" id="my_modal_7" className="modal-toggle" />

      <div className="modal" role="dialog">
        <div className="modal-box h-96  space-y-4">
          
        <div className="flex mt-10 justify-center">
          <Card/>
        </div>
        <h2 className="text-xl font-semibold">Prompt Dictionary ♡</h2>
          <p className="text-sm text-gray-500">
            Prompts you love, organized for when you need them most.
          </p>

      </div>

        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
    </>
  );
}
// <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>