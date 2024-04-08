import { Button } from "flowbite-react"

export function InputComponent(props: {onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, onClick: () => void}) {
    return (
      
        <div className="rounded-md flex">
          <input
            type="text"
            name="cityName"
            className="block rounded-md py-1.5 p-1 mx-2 text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 md:text-lg lg:text-3xl"
            placeholder="Enter City here"
            onChange={props.onChange}
            
          />
          <Button 
          className="block rounded-md py-1.5 px-8 ring-gray-300 placeholder:text-gray-400 hover:ring-indigo-800 md:text-lg lg:text-3xl bg-indigo-500"
          onClick={props.onClick}>Search</Button>
        </div>
      
    )
  }