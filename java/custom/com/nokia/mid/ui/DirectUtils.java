package com.nokia.mid.ui;

import javax.microedition.lcdui.Graphics;
import javax.microedition.lcdui.Image;
import javax.microedition.lcdui.Font;
import javax.microedition.lcdui.Displayable;

public class DirectUtils {
    public static DirectGraphics getDirectGraphics(Graphics g) {
        return new DirectGraphicsImp(g);
    }

    public static Image createImage(int width, int height, int argb) {
        Image img = Image.createImage(width, height);
        Graphics g = img.getGraphics();
        getDirectGraphics(g).setARGBColor(argb);
        g.fillRect(0, 0, width, height);
        return img;
    }

    private static native Image makeMutable(Image image);

    public static Image createImage(byte imageData[], int imageOffset, int imageLength) {
        // There's a suggested method to create mutable images from immutable ones in
        // javax/microedition/lcdui/Image.java, but it looks pretty slower.
        return makeMutable(Image.createImage(imageData, imageOffset, imageLength));
    }

    public static Font getFont(int face, int style, int height) {
        throw new RuntimeException("DirectUtils::getFont(int,int,int) not implemented");
    }

    public static boolean setHeader(Displayable displayable, String headerText, Image headerImage, int headerTextColor, int headerBgColor, int headerDividerColor) {
        throw new RuntimeException("DirectUtils::setHeader(Displayable,String,Image,int,int,int) not implemented");
    }
}
