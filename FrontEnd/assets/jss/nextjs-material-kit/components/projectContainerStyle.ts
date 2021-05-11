import { container } from "../../nextjs-material-kit";

const projectContainerStyle: any = {
    container: {
        ...container,
        flexWrap: "wrap",
        justifyContent: "flex-start",
    },
    item: {
        "marginBottom": "2rem",
        display: 'flex',
    },
}

export default projectContainerStyle;