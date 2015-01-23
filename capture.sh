#!/bin/bash
gst-launch-1.0 \
    v4l2src \
    ! videoscale \
    ! video/x-raw,height=720,width=1280,framerate=30/1 \
    ! videoconvert \
    ! clockoverlay shaded-background=true font-desc="Monospace 10" \
    ! vp8enc target-bitrate=8000 \
    ! m. \
    autoaudiosrc \
    ! vorbisenc \
    ! m. \
    webmmux name=m streamable=true \
    ! queue \
    ! tcpserversink host=localhost port=8888 sync-method=2
