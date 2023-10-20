import { OverPack } from 'rc-scroll-anim';
import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';

const Demo = () => {
    return (
        <OverPack style={{ overflow: 'hidden', height: 200 }}>
            <TweenOne
                key="0"
                animation={{ opacity: 1 }}
                className="code-box-shape"
                style={{ opacity: 0, marginBottom: 10 }}
            />
            <QueueAnim
                key="queue"
                leaveReverse
                style={{ float: 'left', position: 'relative', left: '50%', marginLeft: -165 }}
            >
                <div key="a" className="code-box-shape queue-anim-demo" >Eugene</div>
                <div key="b" className="code-box-shape queue-anim-demo" >Eugene</div>
                <div key="c" className="code-box-shape queue-anim-demo" >Eugene</div>
                <div key="d" className="code-box-shape queue-anim-demo" >Eugene</div>
                <div key="e" className="code-box-shape queue-anim-demo" >Eugene</div>
                <div key="f" className="code-box-shape queue-anim-demo" >Eugene</div>
            </QueueAnim>

        </OverPack>
    );
};

export default Demo;
