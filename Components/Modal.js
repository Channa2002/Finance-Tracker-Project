export const Modal = ({show, onClose, children}) => {
    return(
              <div 
              className="absolute top-0 left-0 w-full h-full z-10  transition-all duration-500"
              style={
                { transform :show? "translateX(0%)" : "translateX(-200%"}
              }
              >
              <div className="container mx-auto max-w-2xl min-w-[80vh] rounded-3xl bg-slate-800 px-6 py-4">
                <button onClick={() => {
                  onClose(false)
                }} className="w-10 h-10 mb-4 font-bold rounded-full bg-slate-600">
                  X
                </button>
                {children}
              </div>
              </div>
    )
}