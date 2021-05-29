import styled from 'styled-components'

const ColCont = styled.a`
    text-decoration: none;
    display: flex;
    flex-direction: column;
    &:hover{
        background-color:#d7e3fc;
    }
    border-color: #b6ccfe;
    border-bottom-style: solid;
    padding-left: 0px;
    padding-top: 10px;
    padding-bottom: 10px;
`
const Source = styled.div`
    color: black;
    font-size: 17px;
    transition: font-size .1s;
    transition: color .1s;
    ${ColCont}:hover & {
        font-size 18px;
    }
    margin-bottom: 10px;
    padding-left: 0px;
    font-weight:bold;   
`
const Title = styled.div`
color: grey;
font-size 17px;
transition: font-size .1s;
${ColCont}:hover & {
    color: #0A54FF;
    font-size 19px;
}
padding-left: 0px;
`
const Headline = (props) =>{
    return(
        <ColCont href = {props.href}>
            <Source>
                The Economist
            </Source>
            <Title href = {props.href}>
                {props.title}
            </Title>
        </ColCont>

    )
}
export default Headline;