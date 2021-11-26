import React from 'react';

import styled, { css } from 'styled-components';
import { AiOutlineCode } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";

import ArrowTooltip from './shared/ArrowTooltip';
import { baseIcon, roundedBackground } from "../design/mixins";

const PillWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
  width: 8px;
  height: 48px;
  display: flex;
  align-items: center;
`

const PillContainer = styled.div`
  width: 8px;
  height: ${p => p.isActive ? "40px" : "0"};
  margin-left: -4px;
  border-radius: 0 4px 4px 0;
  background-color: var(--header-primary);
  transition: 0.2s;
`

const discordIconStyle = css`
  color: ${p => p.isActive ? "white" : "var(--text-normal)"};
  background-color: ${p => p.isActive ? "var(--brand)" : "var(--background-primary)"};

  &:hover {
    background-color: var(--brand);
  }
`

const IconWrapper = styled.div`
  ${baseIcon};
  ${roundedBackground};
  transition: 0.3s;
  background-color: #faa519;

  &:hover {
    border-radius: 16px;
  }

  ${p => p.isActive && css`
    border-radius: 16px;
  `}

  &:hover + ${PillWrapper} > ${PillContainer} {
    height: ${p => p.isActive ? "40px" : "24px"};
  }

  ${p => p.isDiscord && discordIconStyle}
`

const ListItem = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const Divider = styled.div`
  height: 2px;
  width: 32px;
  border-radius: 1px;
  background-color: var(--background-modifier-accent);
`

const Container = styled.div`
  background-color: var(--background-tertiary);
  width: 72px;
  overflow: hidden;
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`

const Pill = () => {
  return (
    <PillWrapper>
      <PillContainer></PillContainer>
    </PillWrapper>
  )
}

const ServerIcon = ({ children, ...delegated }) => {
  return (
    <IconWrapper size="28px" w="48px" color="white" {...delegated}>
      {children}
    </IconWrapper>
  )
}

const ServerList = () => {
  return (
    <Container>
      <ListItem>
        <ArrowTooltip title="Home" placement="right">
          <div>
            <ServerIcon isDiscord={true}>
              <FaDiscord />
            </ServerIcon>
            <Pill />
          </div>
        </ArrowTooltip>
      </ListItem>
      <Divider></Divider>
      <ListItem>
        <ArrowTooltip title="Sample Server" placement="right">
          <div>
            <ServerIcon>
              <AiOutlineCode/>
            </ServerIcon>
            <Pill />
          </div>
        </ArrowTooltip>
      </ListItem>
    </Container>
  )
}

export default ServerList;
