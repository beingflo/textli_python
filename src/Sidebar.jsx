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

export const Sidebar = () => {
    const [files, setFiles] = React.useState([])

    React.useEffect(() => {
        fetch('http://192.168.0.157:5000/getfiles').then(res => res.json()).then(res => setFiles(res))
    }, []);

    const sortedFiles = files.sort();

    const handleClick = e => {
        const name = e.currentTarget.dataset.id;
        console.log(name);
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

const getTestFiles = () => {
    return []

    //return (
    //    [
    //        'Life',
    //        'Life/Debt.md',
    //        'Misc',
    //        'Photos',
    //        'Photos/Protocol.md',
    //        'Photos/Store.md',
    //        'Setup',
    //        'Setup/Ubuntu.md',
    //        'Setup/VSCode.md',
    //        'Work',
    //        'Work/test1.md',
    //        'Work/test2.md',
    //        'Work/test3.md',
    //        'Work/test4.md',
    //        'Work/test5.md',
    //        'Work/test6.md',
    //        'Work/test7.md',
    //        'Work/test8.md',
    //        'Work/test9.md',
    //        'Work/test10.md',
    //        'Work/project1',
    //        'Work/project1/test1.md',
    //        'Work/project1/test2.md',
    //        'Work/project1/test3.md',
    //        'Work/project1/test4.md',
    //        'Work/project1/test5.md',
    //        'Work/project2',
    //        'Work/project2/test1.md',
    //        'Work/project2/test2.md',
    //        'Work/project2/test3.md',
    //        'Work/project2/test4.md',
    //        'Work/project2/test5.md',
    //        'Work/project3',
    //        'Work/project3/test1.md',
    //        'Work/project3/test2.md',
    //        'Work/project3/test3.md',
    //        'Work/project3/test4.md',
    //        'Work/project3/test5.md',
    //        'Work/project1/task1',
    //        'Work/project1/task1/subtask1',
    //        'Work/project1/task1/subtask1/file',
    //        'Work/project1/task1/subtask1/subsubtask1',
    //        'Work/project1/task1/subtask1/subsubtask1/test1.md',
    //        'Work/project1/task1/subtask1/subsubtask1/test2.md',
    //        'Work/project1/task1/subtask1/subsubtask1/test3.md',
    //        'Work/project1/task1/subtask1/subsubtask2/test1.md',
    //        'Work/project1/task1/subtask1/subsubtask2/test2.md',
    //    ]
    //);
}

export default Sidebar;