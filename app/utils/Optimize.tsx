import React from 'react';

interface IProps {
  children: React.ReactElement;
}

export class Optimize extends React.Component<IProps> {
  private childType: string | undefined;

  componentDidMount() {
    if (!this.props.children) return;
    this.childType = this.props.children.type.toString();
  }

  shouldComponentUpdate({ children }: IProps) {
    const childType = children.type.toString();
    if (this.childType !== childType) {
      this.childType = childType;
      return true;
    } else return false;
  }

  render() {
    return this.props.children;
  }
}
