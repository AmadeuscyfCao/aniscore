import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {Image, Button, Label} from  'semantic-ui-react';
import {hoverStyle, labelStyle} from './avatarSection.module.scss';

class AvatarSection extends Component {
    constructor() {
        super();
        this.state = {
            isFollow: 'follow',
        }
        this.editAvatar = this.editAvatar.bind(this);
        this.editBackground = this.editBackground.bind(this);
        this.folowHandler = this.followHandler.bind(this);
    }

    componentDidMount() {
        if (this.props.isFollow === 'following') {
            this.setState({
                isFollow: 'following',
            })
        }
    }

    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    editAvatar() {
        if (this.props.user === 'undefined' || this.props.currentUser === 'undefined') {
            return;
        }
        if (this.props.currentUser._id === this.props.user._id) {
            this.props.history.push('/user/editAvatar');
        }
    }

    editBackground() {
        this.props.history.push('/user/editBackground');
    }

    followHandler() {
        if (this.state.isFollow === 'follow') {
            axios('api/user/' + this.props.currentUser._id, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                },
                data: {
                    following_id: this.props.user._id,
                }
            }).then()
            .catch(err => {
                alert(err);
            })
            this.setState({
                isFollow: 'following',
            })
        } else {
            axios('api/user/' + this.props.currentUser._id, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                },
                data: {
                    unfollow_id: this.props.user._id,
                }
            }).then()
            .catch(err => {
                alert(err);
            })
            this.setState({
                isFollow: 'follow',
            })
        }
    }
 
    render() {
        let editStyle = {
            display: 'none', 
            position: 'absolute',
            right: '20px', 
            top: '20px'
        }
        if (this.props.currentUser !== 'undefined' && 
        this.props.user !== 'undefined' && this.props.currentUser._id === this.props.user._id) {
            editStyle.display = 'block';
        }
        let followStyle = {
            display: 'none',
            position: 'absolute',
            right: '70px',
            bottom: '25px'
        }
        if (this.props.currentUser !== 'undefined' 
        && this.props.user !== 'undefined' && this.props.currentUser._id !== this.props.user._id) {
            followStyle.display = 'block';
        }
        let avatar = 'https://react.semantic-ui.com/images/avatar/small/daniel.jpg';;
        if (this.props.user.avatar) {
            let base64Flag = 'data:image/jpeg;base64,';
            let avatarStr = this.arrayBufferToBase64(this.props.user.avatar.data.data);
            avatar = base64Flag + avatarStr;
        }
        let background = 'http://img.ecyss.com/original/20/20438/21435bb1f5454a70.jpg';
        if (this.props.user.background) {
            let base64Flag = 'data:image/jpeg;base64,';
            let backgroundStr = this.arrayBufferToBase64(this.props.user.background.data.data);
            background =  base64Flag + backgroundStr;
        }
        let backgroundStyle = {
            position: 'relative',
            display: 'block',
            margin: '0 auto',
            width: '85%',
            height: '300px',
            backgroundImage: 'url(' + background + ')',
        }
        let textStyle = {
            position: 'absolute',
            background: 'rgba(34, 140 ,255, 0.8)',
            left: '140px',
            bottom: '25px',
            fontSize: '13pt',
            color: 'white',
        }
        let avatarStyle = {
            position: 'absolute',
            transform: 'scale(2.5)',
            left: '70px',
            bottom: '40px',
        }
        let button = <Button style = {followStyle} color = 'blue'
        onClick = {this.folowHandler}>Follow</Button>;
        if (this.state.isFollow === 'following') {
            button = 
            <Button style = {followStyle} animated='fade' color = 'blue'
            onClick = {this.followHandler}>
                <Button.Content visible>Following</Button.Content>
                <Button.Content hidden>Unfollow</Button.Content>
            </Button>
        }
        return (
            <Label className = {labelStyle} style = {backgroundStyle}>
                <Image className = {hoverStyle} onClick = {this.editAvatar} 
                style = {avatarStyle} avatar src = {avatar}
                />
                <Label style = {textStyle}>
                    {this.props.user.username}
                </Label>
                <Button style = {editStyle} onClick = {this.editBackground} 
                color = 'blue'>Change Cover</Button>
                {button}
            </Label>
        )
    }
}

export default withRouter(AvatarSection);