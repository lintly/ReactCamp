import React, { Children } from 'react';
import {Text} from 'react-native';

type Props = {
    children: string;
}
function Paragraph(props: Props) {
    return (
        <Text style={{color: '#eeeeff', fontSize: 22}}>
            {props.children}
        </Text>
    );
}

export default Paragraph;