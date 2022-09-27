export default function Modal(props) {
    console.log(props);
    return (
        <div
            ref={props.forwadedRef}
            onClick={e => {e.target.classList.add("hidden")}}
            tabIndex="-1"
            aria-hidden="true"
            className="grid hidden place-items-center transition-opacity bg-black bg-opacity-40 overflow-y-auto overflow-x-hidden fixed bottom-0 top-0 right-0 left-0 z-50 w-full"
        >
            <div className=" min-w-[30rem] rounded-lg w-1/4 shadow-xl bg-white p-10" onClick={e => e.stopPropagation()}>
                {props.children}
            </div>
        </div>
    );
}
