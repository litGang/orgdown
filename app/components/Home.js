import React, {Component} from "react";
import styles from "../styles/Home.css";
import Sidebar from "../containers/Sidebar";
import DocList from "../containers/DocList";
import Editor from "../containers/Editor";


class Home extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            sidebarWidth: 220,
            docsWidth: 240,
            studioWidth: window.innerWidth - 460
        };

        this.updateDimensions = this.updateDimensions.bind(this);
    }

    updateDimensions() {
        const windowWidth = window.innerWidth;
        this.setState({'studioWidth': windowWidth - 460});
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    render() {
        return (
            <div>
                <div className={styles.container}>
                    <Sidebar width={this.state.sidebarWidth}/>
                    <DocList width={this.state.docsWidth}/>
                    <Editor className="orgdown-studio" width={this.state.studioWidth}/>
                </div>
            </div>
        );
    }
}

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators(HomeActions, dispatch);
// }

export default Home;