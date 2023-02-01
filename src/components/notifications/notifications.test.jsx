import { act, fireEvent, render, screen, waitFor, waitForElementToBeRemoved, within } from "@testing-library/react";
import renderer from "react-test-renderer";
import Notification from "./notifications.component";

// describe("snapshot test",()=>{
//     test("snapshot loading",()=>{
//         const tree = renderer.create(<Notification   notification={notification}
//             showNotification={true}
//             setShowNotification = {setShowNotification()}/>).toJSON();
//        expect(tree).toMatchSnapshot();
//     })
// })


describe("render Notification",()=>{
    test("show notification with message",()=>{
        render(<Notification   notification={notification} showNotification={true} setShowNotification = {setShowNotification()}/>);
      const notificationText =   within( screen.getByTestId("notification")).getByText("Registrations successful");
         expect(notificationText.innerHTML).toContain("Registrations successful");
    });
    test("close  message on closing cross button",async()=>{
        render(<Notification   notification={notification} showNotification={true} setShowNotification = {setShowNotification}/>);
         const closeButton = screen.getByTestId("close");
        await act(async ()=>{
            fireEvent.click(closeButton);
            await waitFor(()=>{
                expect(screen.getByTestId("notification")).toBeInTheDocument();
            })
         })
        
    })
})

const notification = {type:"success", message:"Registrations successful"};
const setShowNotification = ()=>{
    return null;
}