import React, { useRef } from 'react'

import { useSelector } from "react-redux";
import styled, { css } from "styled-components";

import Avatar from "./shared/Avatar";
import Backdrop from "./shared/Backdrop";
import List from "./shared/List";
import ListItem from "./shared/ListItem";
import UserPopover from './shared/UserPopover';
import { useDetectClickOutside, usePopover } from "../hooks";
import { toggleMemberList } from '../reducers/memberListReducer';

const Container = styled.div`
  background-color: var(--background-secondary);
  width: 240px;
  flex: 0 0 auto;
  height: calc(100vh - 48px);
  overflow: hidden scroll;
  text-overflow: ellipsis;
  padding: 10px 2px 10px 12px;

  @media (min-width: 768px) {
    ${p => !p.isActive && css`
      display: none;
    `}
  }

  @media (max-width: 768px) {
    & {
      position: fixed;
      height: 100vh;
      right: -100%;
      transition: 0.3s;
    }

    ${p => p.isActive && css`
      & {
        right: 0;
      }
    `}
  }
`

const Heading = styled.h3`
  font-size: 13px;
  font-weight: 500;
  margin: 8px 8px 4px 8px;
  color: var(--channels-default);
  text-transform: uppercase;
`

const MemberList = ({ isMobile }) => {
  const memberListRef = useRef(null);
  const showMemberList = useSelector(state => state.memberList.isOpen);
  useDetectClickOutside({
    action: toggleMemberList,
    listenCondition: isMobile && showMemberList,
    ref: memberListRef,
  })

  const users = useSelector(state => state.memberList.onlineUsers);

  const [user, anchorEl, showPopover, setShowPopover, handleOnClick, handleOnClickAway] = usePopover();

  return (
    <Backdrop isActive={isMobile && showMemberList}>
      <Container isActive={showMemberList} ref={memberListRef}>
        <Heading className="disable-select">
          online — {users.length}
        </Heading>
        <List gap="2px">
          {
            users.map((user) => (
              <ListItem
                key={user.id}
                icon={
                  <Avatar size="21px" w="32px" bgColor={user.avatarColor} status="online" />
                }
                text={user.username}
                style={{ gap: "12px", padding: "6px 8px"}}
                onClick={(event) => handleOnClick(event, user)}
              />
            ))
          }
        </List>
        <UserPopover
          open={showPopover}
          anchorEl={anchorEl}
          onClose={handleOnClickAway}
          anchorOrigin={{ vertical: "center", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          user={user}
          setShowPopover={setShowPopover}
        />
      </Container>
    </Backdrop>
  )
}

export default MemberList
