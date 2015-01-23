#!/bin/bash
gst-launch-1.0 \
    v4l2src \
    ! video/x-raw,height=720,width=1280,framerate=30/1 \
    ! clockoverlay shaded-background=true font-desc="Monospace 10" \
    ! vp8enc threads=4 min-quantizer=0 max-quantizer=15 \
    ! m. \
    autoaudiosrc \
    ! vorbisenc \
    ! queue \
    ! m. \
    webmmux name=m streamable=true \
    ! queue \
    ! progressreport \
    ! tcpserversink host=localhost port=8888 sync-method=2 \
