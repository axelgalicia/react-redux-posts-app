/**
 * 404 Message which is displayed when the post does
 * not exist.
 *
 * @version 1.0.0
 * @author [Axel Galicia](https://github.com/axelgalicia)
 */

import React from 'react'
import { Link } from 'react-router-dom'

const My404 = (props) => (
    <div>
        <h2>The posts does not exist</h2>
        <Link to="/" onClick={()=> this.clickToRedirect()}>Go back</Link>
    </div>

);

export default My404