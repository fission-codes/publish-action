{ pkgs ? import <nixpkgs> { } }:

pkgs.mkShell {
  name = "publish-action";
  buildInputs = [ pkgs.act pkgs.bashInteractive ];
}
