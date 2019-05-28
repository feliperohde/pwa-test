function preventBehavior(e) {
            e.preventDefault();
        };

        document.addEventListener("touchmove", preventBehavior, {passive: false});

        function playclip() {
            if (navigator.appName == "Microsoft Internet Explorer" && (navigator.appVersion.indexOf("MSIE 7") != -1) || (navigator.appVersion.indexOf("MSIE 8") != -1)) {
                if (document.all) {
                    document.all.sound.src = "/audio/1.mp3";
                }
            } else {
                {
                    var audio = document.getElementsByTagName("audio")[0];
                    audio.play();
                }
            }
        }

        $(function() {
            $('.canvas').on('touchmove, touchstart, touchend', function(ev) {
                ev.preventDefault();
            });
        });

        var startPos = null;

        interact('.block')
            .draggable({
                onmove: function (event) {
                    var target = event.target,
                        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                    target.style.webkitTransform =
                    target.style.transform =
                        'translate(' + x + 'px, ' + y + 'px)';

                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);
                },
                onend: function (event) {
                    var textEl = event.target.querySelector('p');

                    textEl && (textEl.textContent =
                        'moved a distance of '
                        + (Math.sqrt(event.dx * event.dx +
                                     event.dy * event.dy)|0) + 'px');
                }
            })
            .inertia(true)
            .restrict({
                drag: "",
                endOnly: true,
                elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
            })
            .snap({
                mode: 'anchor',
                anchors: [],
                range: Infinity,
                elementOrigin: { x: 0.5, y: 0.5 },
                endOnly: true
            })
            .on('dragstart', function (event) {
                if (!startPos) {
                  var rect = interact.getElementRect(event.target);

                  // record center point when starting the very first a drag
                  startPos = {
                    x: rect.left + rect.width  / 2,
                    y: rect.top  + rect.height / 2
                  }
                }

                // snap to the start position
                event.interactable.snap({ anchors: [startPos] });
            });


        interact('.dropzone')
            // enable draggables to be dropped into this
            .dropzone({ overlap: 'center' })
            // only accept elements matching this CSS selector
            .accept('.block')
            // listen for drop related events
            .on('dragenter', function (event) {
                var dropRect = interact.getElementRect(event.target),
                    dropCenter = {
                      x: dropRect.left + dropRect.width  / 2,
                      y: dropRect.top  + dropRect.height / 2
                    };

                event.draggable.snap({
                  anchors: [ dropCenter ]
                });

                var draggableElement = event.relatedTarget,
                    dropzoneElement = event.target;

                // feedback the possibility of a drop
                dropzoneElement.classList.add('drop-target');
                draggableElement.classList.add('can-drop');

                console.log('dragenter -------')
                console.log(event);
                console.log('---- dragenter')

            })
            .on('dragleave', function (event) {
                event.draggable.snap(false);


                // when leaving a dropzone, snap to the start position
                event.draggable.snap({ anchors: [startPos] });

                // remove the drop feedback style
                event.target.classList.remove('drop-target');
                event.relatedTarget.classList.remove('can-drop');

                // console.log('dragleave -------')
                // console.log(event);
                // console.log('---- dragleave')
            })
            .on('dropactivate', function (event) {
                // add active dropzone feedback
                event.target.classList.add('drop-active');

                // console.log('dropactivate -------')
                // console.log(event);
                // console.log('---- dropactivate')
            })
            .on('dropdeactivate', function (event) {
                // remove active dropzone feedback
                event.target.classList.remove('drop-active');
                event.target.classList.remove('drop-target');

                // console.log('dropdeactivate -------')
                // console.log(event);
                // console.log('---- dropdeactivate')

                $('.builder .toolbox .block').not('[data-y]').css('transform', 'none');

            })
            .on('drop', function (event) {
                console.log('drop -------')
                console.log(event);
                console.log('---- drop')

                event.relatedTarget.textContent = '';
                playclip();

                $('.toolbox').click();
                $('.toolbox').trigger('click');
            });

        interact('.blocks')
            // enable draggables to be dropped into this
            .dropzone({ overlap: 'center' })
            // only accept elements matching this CSS selector
            .accept('.block')
            // listen for drop related events
            .on('dragenter', function (event) {
                var dropRect = interact.getElementRect(event.target),
                    dropCenter = {
                      x: dropRect.left + dropRect.width  / 2,
                      y: dropRect.top  + dropRect.height / 2
                    };

                event.draggable.snap({
                  anchors: [ dropCenter ]
                });

                var draggableElement = event.relatedTarget,
                    dropzoneElement = event.target;

                // feedback the possibility of a drop
                dropzoneElement.classList.add('drop-target');
                draggableElement.classList.add('can-drop');

                console.log('dragenter -------')
                console.log(event);
                console.log('---- dragenter')

            })
            .on('dragleave', function (event) {
                event.draggable.snap(false);


                // when leaving a dropzone, snap to the start position
                event.draggable.snap({ anchors: [startPos] });

                // remove the drop feedback style
                event.target.classList.remove('drop-target');
                event.relatedTarget.classList.remove('can-drop');

                // console.log('dragleave -------')
                // console.log(event);
                // console.log('---- dragleave')
            })
            .on('dropactivate', function (event) {
                // add active dropzone feedback
                event.target.classList.add('drop-active');

                // console.log('dropactivate -------')
                // console.log(event);
                // console.log('---- dropactivate')
            })
            .on('dropdeactivate', function (event) {
                // remove active dropzone feedback
                event.target.classList.remove('drop-active');
                event.target.classList.remove('drop-target');

                // console.log('dropdeactivate -------')
                // console.log(event);
                // console.log('---- dropdeactivate')

                $('.builder .toolbox .block').not('[data-y]').css('transform', 'none');

            })
            .on('drop', function (event) {
                console.log('drop -------')
                console.log(event);
                console.log('---- drop')

                event.relatedTarget.textContent = '';
                playclip();
            });

            /*.on('dragenter', function (event) {
                var draggableElement = event.relatedTarget,
                    dropzoneElement = event.target;

                // feedback the possibility of a drop
                dropzoneElement.classList.add('drop-target');
                draggableElement.classList.add('can-drop');
            })
            .on('dragleave', function (event) {
                // remove the drop feedback style
                event.target.classList.remove('drop-target');
                event.relatedTarget.classList.remove('can-drop');
            })
            .on('dropactivate', function (event) {
                // add active dropzone feedback
                event.target.classList.add('drop-active');
            })
            .on('dropdeactivate', function (event) {
                // remove active dropzone feedback
                event.target.classList.remove('drop-active');
                event.target.classList.remove('drop-target');
            })
            .on('drop', function (event) {
                event.relatedTarget.textContent = '';
            });*/

            //Defining variable based on unique ID

