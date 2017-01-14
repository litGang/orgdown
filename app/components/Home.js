import React, { Component } from "react";
import styles from "../styles/Home.css";
// import Sidebar from "../containers/Sidebar";
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import Sidebar from 'grommet/components/Sidebar';
import User from 'grommet/components/icons/base/User';

import App from 'grommet/components/App';
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
        this.setState({ 'studioWidth': windowWidth - 460 });
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    render() {
        return (
            <App centered={false}>
                <div className={styles.container}>
                    {/*<Sidebar width={this.state.sidebarWidth}/>*/}
                    <Sidebar colorIndex='grey-4'
                        fixed={false}
                        size='small'>
                        <Header pad='medium'
                            justify='between'>
                            <Title>
                                Orgdown
                            </Title>
                        </Header>
                        <Box flex='grow'
                            justify='start'>
                            <Menu primary={true}>
                                <Anchor href='#'
                                    className='active'>
                                    知识库
                                </Anchor>
                                <Anchor href='#'>
                                    Second
                                </Anchor>
                                <Anchor href='#'>
                                    回收站
                                </Anchor>
                            </Menu>
                        </Box>
                        <Footer pad='medium'>
                            <Button icon={<User />} />
                        </Footer>
                    </Sidebar>
                    <DocList width={this.state.docsWidth} />
                    <Editor className="orgdown-studio" width={this.state.studioWidth} />
                </div>
            </App>
        );
    }
}

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators(HomeActions, dispatch);
// }

export default Home;