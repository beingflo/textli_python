import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
    background-color: #fafafa;
    height: 100vh;

    display: flex;
    flex-direction: column;
    padding: 40px;
`;

const DirectoryEntry = styled.div`
    color: black;
    font-size: 22px;
    padding-left: ${props => props.indent * 20}px;
    padding-bottom: 2px;
`;

export const Sidebar = () => {
    const files = getTestFiles();

    const sortedFiles = files.sort();

    return (
        <SidebarContainer>
            { sortedFiles.map(file => getName(file)).map(([name, indent]) =>
                <DirectoryEntry indent= {indent}>
                    {name}
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
    return (
        [
            'Life',
            'Life/Debt.md',
            'Misc',
            'Photos',
            'Photos/Protocol.md',
            'Photos/Store.md',
            'Setup',
            'Setup/Ubuntu.md',
            'Setup/VSCode.md',
            'Work',
            'Work/test1.md',
            'Work/test2.md',
            'Work/test3.md',
            'Work/test4.md',
            'Work/test5.md',
            'Work/test6.md',
            'Work/test7.md',
            'Work/test8.md',
            'Work/test9.md',
            'Work/test10.md',
            'Work/project1',
            'Work/project1/test1.md',
            'Work/project1/test2.md',
            'Work/project1/test3.md',
            'Work/project1/test4.md',
            'Work/project1/test5.md',
            'Work/project2',
            'Work/project2/test1.md',
            'Work/project2/test2.md',
            'Work/project2/test3.md',
            'Work/project2/test4.md',
            'Work/project2/test5.md',
            'Work/project3',
            'Work/project3/test1.md',
            'Work/project3/test2.md',
            'Work/project3/test3.md',
            'Work/project3/test4.md',
            'Work/project3/test5.md',
            'Work/project1/task1',
            'Work/project1/task1/subtask1',
            'Work/project1/task1/subtask1/file',
            'Work/project1/task1/subtask1/subsubtask1',
            'Work/project1/task1/subtask1/subsubtask1/test1.md',
            'Work/project1/task1/subtask1/subsubtask1/test2.md',
            'Work/project1/task1/subtask1/subsubtask1/test2.md',
            'Work/project1/task1/subtask1/subsubtask2/test1.md',
            'Work/project1/task1/subtask1/subsubtask2/test2.md',
        ]
    );
}

export default Sidebar;