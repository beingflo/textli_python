import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
    background-color: #fafafa;
    height: 95vh;

    display: flex;
    flex-direction: column;
    padding-top: 5vh;
    padding-left: 50px;
`;

const DirectoryEntry = styled.div`
    color: black;
    font-size: 18px;
    padding-bottom: 2px;
    cursor: ${props => props.isClickable ? 'pointer' : ''};
    padding-left: ${props => props.indent * 20}px;
`;

export const Sidebar = (props) => {
    const {text, setText} = props;
    const [files, setFiles] = React.useState([])

    React.useEffect(() => {
        fetch('http://192.168.1.196:5000/getfiles').then(res => res.json()).then(res => setFiles(res))
    }, []);

    const sortedFiles = files.sort();

    const handleClick = e => {
        const name = e.currentTarget.dataset.id;
        fetch(`http://192.168.1.196:5000/read/${name}`).then(res => res.text()).then(res => setText(res))
    }

    const isFile = file => {
        return file.endsWith('.md');
    }

    return (
        <SidebarContainer>
            { sortedFiles.map(file =>
                <DirectoryEntry key={file} data-id={file} onClick={e => handleClick(e)} indent= {getName(file)[1]} isClickable={isFile(file)}>
                    {getName(file)[0]}
                </DirectoryEntry>
            )}
        </SidebarContainer>
    );
}

const getName = path => {
    const split = path.split('/');

    return [split[split.length - 1], split.length - 1]
}

export default Sidebar;