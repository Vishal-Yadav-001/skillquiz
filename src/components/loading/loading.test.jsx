import renderer from "react-test-renderer";
import Loader from "./loader.component";

describe("snapshot test",()=>{
    test("snapshot loading",()=>{
        const tree = renderer.create(<Loader/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})