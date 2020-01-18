import $ from 'jquery';

const CssSelectorGenerator = require('css-selector-generator');
const browser = require('webextension-polyfill');

// alert('hello world');
function main() {
    if ($('.scrapdash').length > 0) return;
    $('body').append(`
        <style class="scrapdash">
        #selector-top, #selector-bottom {
            background: #243f4d;
            height:3px;
            position: fixed;
            transition:all 300ms ease;
        }
        #selector-left, #selector-right {
            background: #243f4d;
            width:3px;
            position: fixed;
            transition:all 300ms ease;
        }
        
        .n{
         -webkit-transform: scale(3) translateX(100px)   
        }        
        </style>
        <div class="scrapdash" id="selector">
            <div id="selector-top"></div>
            <div id="selector-left"></div>
            <div id="selector-right"></div>
            <div id="selector-bottom"></div>
        </div>
    `);
    let elements = {
        top: $('#selector-top'),
        left: $('#selector-left'),
        right: $('#selector-right'),
        bottom: $('#selector-bottom'),
    };

    let drawBox = function (event) {
        if (event.target.id.indexOf('selector') !== -1 || event.target.tagName === 'BODY' || event.target.tagName === 'HTML') return;

        let $target = $(event.target);
        let targetOffset = $target[0].getBoundingClientRect(),
            targetHeight = targetOffset.height,
            targetWidth = targetOffset.width;

        elements.top.css({
            left: (targetOffset.left - 4),
            top: (targetOffset.top - 4),
            width: (targetWidth + 5)
        });
        elements.bottom.css({
            top: (targetOffset.top + targetHeight + 1),
            left: (targetOffset.left - 3),
            width: (targetWidth + 4)
        });
        elements.left.css({
            left: (targetOffset.left - 5),
            top: (targetOffset.top - 4),
            height: (targetHeight + 8)
        });
        elements.right.css({
            left: (targetOffset.left + targetWidth + 1),
            top: (targetOffset.top - 4),
            height: (targetHeight + 8)
        });

    }
    document.addEventListener('mousemove', drawBox);
    let selectFunc = async function (event) {

        if (event.target.id.indexOf('selector') !== -1 || event.target.tagName === 'BODY' || event.target.tagName === 'HTML') return;

        let $target = $(event.target);


        let generator = new CssSelectorGenerator;

        let selector = generator.getSelector(event.target); //=> #login
        console.log(selector);
        let { feedOptions, counter } = await browser.storage.local.get({ feedOptions: [], counter: 0 });
        console.log(feedOptions);
        feedOptions.unshift({
            id: counter,
            url: window.location.href,
            selector,
            type: 'screenshot',
        });
        

        await browser.storage.local.set({
            feedOptions,
            counter: counter + 1,
        });

        document.removeEventListener('mousemove', drawBox);

        for (let each of $('.scrapdash')) {
            each.remove();
        }
        document.removeEventListener('mousedown', selectFunc);


    }
    document.addEventListener('mousedown', selectFunc);
}

main();