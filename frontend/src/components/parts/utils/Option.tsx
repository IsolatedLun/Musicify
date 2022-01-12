import React from 'react'

const Option = ({ val }: { val: string }) => {
    return(
        <option value={val.toLowerCase()}>{ val }</option>
    )
}

export default Option
