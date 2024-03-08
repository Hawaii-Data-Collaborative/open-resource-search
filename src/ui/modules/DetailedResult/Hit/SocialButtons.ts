import styled from 'styled-components'
import Button from '../../../elements/Button'
import Link from '../../../elements/Link'

export const PrintButton = styled(Button)`
  justify-content: center;
  box-sizing: border-box;
  background-color: #d14c3e;
  text-align: center;
  margin-bottom: 8px;
  padding: 16px;
  color: #fff;
  border-radius: 4px;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  font-weight: normal;
  font-size: 1rem;
  height: 54px;

  :hover {
    opacity: 0.8;
  }
`

export const EmailButton = styled(Link)`
  box-sizing: border-box;
  background-color: #666;
  text-align: center;
  margin-bottom: 8px;
  padding: 16px;
  color: #fff;
  border-radius: 4px;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  font-weight: normal;
  font-size: 1rem;
  height: 54px;
  display: block;

  :hover {
    opacity: 0.8;
    text-decoration: none;
  }
`

export const FacebookButton = styled(Link)`
  box-sizing: border-box;
  background-color: #3d5a96;
  text-align: center;
  margin-bottom: 8px;
  padding: 16px;
  color: #fff;
  border-radius: 4px;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  font-weight: normal;
  font-size: 1rem;
  height: 54px;
  display: block;

  :hover {
    opacity: 0.8;
    text-decoration: none;
  }
`

export const TwitterButton = styled(Link)`
  box-sizing: border-box;
  background-color: #58acea;
  text-align: center;
  padding: 16px;
  color: #fff;
  border-radius: 4px;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  font-weight: normal;
  font-size: 1rem;
  height: 54px;
  display: block;

  :hover {
    opacity: 0.8;
    text-decoration: none;
  }
`
