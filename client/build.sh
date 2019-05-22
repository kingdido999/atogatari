#!/bin/bash
sudo swapon /swapfile
npm run build
sudo swapoff /swapfile
