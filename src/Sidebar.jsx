import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
    background-color: #fafafa;
    height: 100vh;
`;

export const Sidebar = () => {
    const files = getTestFiles();


    return (
        <SidebarContainer>
            test
        </SidebarContainer>
    );
}

const getTestFiles = () => {
    return (
        [
            '/Life',
            '/Life/Debt.md',
            '/Misc',
            '/Photos',
            '/Photos/Protocol.md',
            '/Photos/Store.md',
            '/Setup/Ubuntu.md',
            '/Setup/VSCode.md',
            '/Work',
            '/Work/test1',
            '/Work/test2',
            '/Work/test3',
            '/Work/test4',
            '/Work/test5',
            '/Work/test6',
            '/Work/test7',
            '/Work/test8',
            '/Work/test9',
            '/Work/test10',
            '/Work/project1/test1',
            '/Work/project1/test2',
            '/Work/project1/test3',
            '/Work/project1/test4',
            '/Work/project1/test5',
            '/Work/project2/test1',
            '/Work/project2/test2',
            '/Work/project2/test3',
            '/Work/project2/test4',
            '/Work/project2/test5',
            '/Work/project3/test1',
            '/Work/project3/test2',
            '/Work/project3/test3',
            '/Work/project3/test4',
            '/Work/project3/test5',
            '/Work/project1/task1/subtask1/subsubtask1/test1',
            '/Work/project1/task1/subtask1/subsubtask1/test2',
            '/Work/project1/task1/subtask1/subsubtask1/test2',
            '/Work/project1/task1/subtask1/subsubtask2/test1',
            '/Work/project1/task1/subtask1/subsubtask2/test2',
        ]
    );
}

export default Sidebar;