import React, {Component} from "react";
// import Sidebar from "../containers/Sidebar";
import Header from "grommet/components/Header";
import Title from "grommet/components/Title";
import Box from "grommet/components/Box";
import Menu from "grommet/components/Menu";
import Anchor from "grommet/components/Anchor";
import Footer from "grommet/components/Footer";
import Button from "grommet/components/Button";
import Sidebar from "grommet/components/Sidebar";
import Split from "grommet/components/Split";
import Search from "grommet/components/Search";
import User from "grommet/components/icons/base/User";
import AddIcon from "grommet/components/icons/base/Add";
import InheritIcon from "grommet/components/icons/base/Inherit";
import StatusIcon from "grommet/components/icons/Status";
// import ListPlaceholder from 'grommet-addons/components/ListPlaceholder';
import Tiles from "grommet/components/Tiles";
import Tile from "grommet/components/Tile";
import FolderIcon from "grommet/components/icons/base/Folder";
import DocumentNotesIcon from "grommet/components/icons/base/DocumentNotes";
import App from "grommet/components/App";

class NewHome extends Component {
	render() {
		return (
			<App centered={false} inline={true}>
				<Split flex='right'>
					<Sidebar colorIndex='neutral-3' fixed={false} size='medium'>
						<Header pad='medium' justify='between'>
							<Title><InheritIcon type='logo'/>Orgdown</Title>
						</Header>
						<Box flex='grow' justify='start'>
							<Menu primary={true}>
								<Anchor href='#'>
									首页
								</Anchor>
								<Anchor href='#' className='active'>
									知识库
								</Anchor>
								<Anchor href='#'>
									标签
								</Anchor>
								<Anchor href='#'>
									回收站
								</Anchor>
							</Menu>
						</Box>
						<Footer pad='medium'>
							<Button icon={<User />}/>
						</Footer>
					</Sidebar>
					<Box justify='center' align='left' pad='small'>
						<Header size='small'>
							<Title>
								知识库
							</Title>
							<Box flex={true} justify='end' direction='row' responsive={false}>
								<Search inline={true} fill={true} size='medium' placeHolder='Search'
										dropAlign={{"right": "right"}}/>
								<Menu icon={<AddIcon />}
									  dropAlign={{"right": "right"}}>
									<Anchor href='#'
											className='active'>
										First
									</Anchor>
									<Anchor href='#'>
										Second
									</Anchor>
									<Anchor href='#'>
										Third
									</Anchor>
								</Menu>
							</Box>
						</Header>
						<Tiles fill={false} flush={false} selectable={true} onSelect={() => {
							console.log('12313')
						} }>
							<Tile align="center" pad="small" direction="column" size="small"
								  href={`/virtual-machines`}
								  selected={true}
								  a11yTitle={`View Virtual Machine`}>
								<FolderIcon size='large' type='logo'/>
								<strong>Java</strong>
								<div>
									<StatusIcon value='ok' size="small"/>
									<span className="secondary">已同步</span>
								</div>
							</Tile>
							<Tile align="center" wide={false} pad="small" direction="column" size="small"
								  href={`/virtual-machines`}
								  selected={true}
								  a11yTitle={`View Virtual Machine`}>
								<DocumentNotesIcon size='large' type='logo'/>
								<strong>算法学习笔记</strong>
								<div>
									<StatusIcon value='ok' size="small"/>
									<span className="secondary">已同步</span>
								</div>
							</Tile>
						</Tiles>
					</Box>
				</Split>
			</App>
		);
	}
}

export default NewHome;