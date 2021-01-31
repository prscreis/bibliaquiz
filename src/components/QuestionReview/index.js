import styled from 'styled-components';

const QuestionReview = styled.div`
    border: 1px solid ${({ theme }) => ((props) => (props.success ? theme.colors.success : theme.colors.wrong))};
    border-radius: ${({ theme }) => theme.borderRadius};
    margin-bottom: 16px;
    padding: 4px;

    em{
        margin-bottom: 12px;
        display: block;
    }

    img{
        position: relative;
        top: 1px;
        
        &.success {
            height: 15px;
            left: 5px;
            width: 15px;
        }
    
        &.wrong {
            height: 13px;
            left: 6px;
            width: 13px;
        }
    }
`;

export default QuestionReview;
